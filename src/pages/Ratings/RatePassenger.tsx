import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import { Link, useParams } from "react-router-dom";
import { User, Clock, MapPin } from "lucide-react";
import success_animation from "@/assets/animations/success.json";
import Lottie from "lottie-react";
import { supabase } from "@/supabaseClient.ts";
import { ReviewOption } from "@/types.ts";
import { calculateDuration } from "@/lib/utils.ts";

// Updated interface to include passengerName and passengerId.
interface RideDetails {
  from: string;
  to: string;
  passengerName: string;
  duration: string;
  passengerId: string;
}

const RatePassenger = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const [rideLoading, setRideLoading] = useState<boolean>(false);

  const [step, setStep] = useState(1);
  const [likedRide, setLikedRide] = useState<boolean | null>(null);
  const [selectedReviewOptions, setSelectedReviewOptions] = useState<string[]>(
    [],
  );
  const [positiveReviewOptions, setPositiveReviewOptions] = useState<
    ReviewOption[]
  >([]);
  const [negativeReviewOptions, setNegativeReviewOptions] = useState<
    ReviewOption[]
  >([]);
  const [comment, setComment] = useState("");

  // Fetch ride details from Supabase (similar to RateDriver)
  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!rideId) return;
      setRideLoading(true);
      const { data, error } = await supabase
        .from("rides")
        .select(
          `
          id,
          start_time,
          end_time,
          stops (
            stop_type,
            locations(name)
          ),
          passenger:users(id, first_name, last_name, image)
          `,
        )
        .eq("id", rideId)
        .single();

      if (error) {
        console.error("Error fetching ride details:", error.message);
        setRideLoading(false);
        return;
      }

      // Extract the start and end stops.
      const startStop: any = data.stops.find(
        (stop: any) => stop.stop_type === "start",
      );
      const endStop: any = data.stops.find(
        (stop: any) => stop.stop_type === "end",
      );

      const details: RideDetails = {
        from: startStop?.locations?.name || "Unbekannt",
        to: endStop?.locations?.name || "Unbekannt",
        passengerName: `${
          // @ts-ignore
          data.passenger.first_name
          // @ts-ignore
        } ${data.passenger.last_name.charAt(0)}.`,
        duration: calculateDuration(data.start_time, data.end_time),
        // @ts-ignore
        passengerId: data.passenger.id,
      };

      setRideDetails(details);
      setRideLoading(false);
    };

    fetchRideDetails();
  }, [rideId]);

  const getReviewOptions = async () => {
    const { data, error } = await supabase
      .from("review_options")
      .select("*")
      .eq("to_driver", false);
    if (error) {
      console.error("Error fetching review options:", error.message);
      return;
    }
    if (data) {
      setPositiveReviewOptions(data.filter((option) => option.is_positive));
      setNegativeReviewOptions(data.filter((option) => !option.is_positive));
    }
  };

  useEffect(() => {
    getReviewOptions();
  }, []);

  const handleReviewSelection = (review: string) => {
    setSelectedReviewOptions((prev) =>
      prev.includes(review)
        ? prev.filter((item) => item !== review)
        : [...prev, review],
    );
  };

  const handleSubmitReview = async () => {
    // Get the current authenticated user.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error fetching current user:", userError?.message);
      return;
    }

    // Check that the current user is not reviewing themselves.
    if (user.id === rideDetails?.passengerId) {
      console.error("You cannot review yourself as a passenger.");
      return;
    }

    // Check if the current user has already left a review for this passenger.
    const { data: existingReview, error: existingReviewError } = await supabase
      .from("reviews")
      .select("id")
      .eq("reviewer_id", user.id)
      .eq("reviewee_id", rideDetails?.passengerId);
    if (existingReviewError) {
      console.error(
        "Error checking for existing review:",
        existingReviewError.message,
      );
      return;
    }
    if (existingReview && existingReview.length > 0) {
      console.error("You have already left a review for this passenger.");
      return;
    }

    // Compose the review comment including any selected review options.
    const reviewComment =
      comment +
      (selectedReviewOptions.length > 0
        ? ` (${selectedReviewOptions.join(", ")})`
        : "");

    // Prepare the payload for insertion.
    const reviewPayload = {
      reviewer_id: user.id,
      reviewee_id: rideDetails?.passengerId,
      is_positive: likedRide,
      comment: reviewComment,
    };

    // Insert the review record into the "reviews" table.
    const { error: insertError } = await supabase
      .from("reviews")
      .insert(reviewPayload);
    if (insertError) {
      console.error("Error inserting review:", insertError.message);
      return;
    }

    // On success, move to the thank-you step.
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mt-8">Wie war dein Mitfahrer?</h2>
            <div className="flex space-x-10 mt-10">
              <button
                onClick={() => {
                  setStep(2);
                  setLikedRide(false);
                }}
                className="text-6xl hover:scale-110 transition"
              >
                😔
              </button>
              <button
                onClick={() => {
                  setStep(2);
                  setLikedRide(true);
                }}
                className="text-6xl hover:scale-110 transition"
              >
                😄
              </button>
            </div>
            <Link
              to={"/"}
              className="mt-10 text-green-700 border border-green-700 px-4 py-2 rounded-full hover:bg-green-700 hover:text-white transition"
            >
              Überspringen
            </Link>
          </div>
        );
      case 2: {
        const reviewOptions = likedRide
          ? positiveReviewOptions
          : negativeReviewOptions;
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-10">
              {likedRide
                ? "Was hat dir am Mitfahrer gefallen?"
                : "Was hat dir am Mitfahrer nicht gefallen?"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {reviewOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleReviewSelection(option.text)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedReviewOptions.includes(option.text)
                      ? "bg-green-700 text-white"
                      : "text-green-700 border-green-700"
                  } transition`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <textarea
              className="w-8/12 border border-gray-300 rounded-lg p-3 mt-10 focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Kommentar hinterlassen"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleSubmitReview}
              className="text-xl bg-green-700 text-white px-6 py-2 rounded-full mt-10 hover:bg-green-800 transition"
            >
              Senden
            </button>
          </div>
        );
      }
      case 3:
        return (
          <div className="flex flex-col items-center mt-10">
            <Lottie
              animationData={success_animation}
              style={{ width: 150, height: 150 }}
              loop={false}
            />
            <h2 className="text-3xl font-bold mt-6">
              Danke für dein Feedback!
            </h2>
            <Link
              to={"/"}
              className="text-green-700 border border-green-700 px-4 py-2 rounded-full mt-10 hover:bg-green-700 hover:text-white transition"
            >
              Zurück zur Startseite
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="w-10/12 mx-auto my-14 p-10">
        <h1
          className={`text-4xl font-bold text-center ${
            step === 3 ? "text-green-700" : "text-gray-800"
          }`}
        >
          Danke für deine Fahrt!
        </h1>
        {rideLoading ? (
          <p className="text-center mt-6">Lade Fahrtdetails...</p>
        ) : rideDetails ? (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold">Fahrtdetails</h3>
            <div className="flex flex-wrap gap-6 mt-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-700" />
                <p className="text-gray-700">
                  <strong>Von:</strong> {rideDetails.from}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-700" />
                <p className="text-gray-700">
                  <strong>Nach:</strong> {rideDetails.to}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-green-700" />
                <p className="text-gray-700">
                  <strong>Mitfahrer:</strong> {rideDetails.passengerName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-700" />
                <p className="text-gray-700">
                  <strong>Dauer:</strong> {rideDetails.duration}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-6">Keine Fahrtdetails gefunden</p>
        )}
        {renderStep()}
      </div>
    </Layout>
  );
};

export default RatePassenger;
