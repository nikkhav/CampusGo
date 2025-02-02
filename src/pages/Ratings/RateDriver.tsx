import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import { Link, useParams } from "react-router-dom";
import { Car, User, Clock, MapPin } from "lucide-react";
import Lottie from "lottie-react";
import success_animation from "@/assets/animations/success.json";
import { supabase } from "@/supabaseClient.ts";
import { ReviewOption } from "@/types.ts";
import { calculateDuration } from "@/lib/utils.ts";

interface RideDetails {
  from: string;
  to: string;
  driverName: string;
  driverCar: string;
  duration: string;
}

const RateDriver = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const [rideLoading, setRideLoading] = useState<boolean>(false);

  const [step, setStep] = useState(1);
  const [likedRide, setLikedRide] = useState<boolean | null>(null);
  const [selectedReviewOptions, setSelectedReviewOptions] = useState<string[]>(
    [],
  );
  const [comment, setComment] = useState("");
  const [positiveReviewOptions, setPositiveReviewOptions] = useState<
    ReviewOption[]
  >([]);
  const [negativeReviewOptions, setNegativeReviewOptions] = useState<
    ReviewOption[]
  >([]);

  const getReviewOptions = async (): Promise<ReviewOption[] | null> => {
    const { data, error } = await supabase
      .from("review_options")
      .select("*")
      .eq("to_driver", true);

    if (error) {
      console.error("Error fetching review options:", error.message);
      return null;
    }
    return data;
  };

  useEffect(() => {
    const fetchReviewOptions = async () => {
      const data = await getReviewOptions();
      if (data) {
        setPositiveReviewOptions(data.filter((option) => option.is_positive));
        setNegativeReviewOptions(data.filter((option) => !option.is_positive));
      }
    };

    fetchReviewOptions();
  }, []);

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
                driver:users(id, first_name, last_name, image),
                vehicle:vehicles(
                  id,
                  brand,
                  model,
                  license_plate
                )
              `,
        )
        .eq("id", rideId)
        .single();

      if (error) {
        console.error("Error fetching ride details:", error.message);
        setRideLoading(false);
        return;
      }

      // Extract the start and end stops
      const startStop: any = data.stops.find(
        (stop: any) => stop.stop_type === "start",
      );
      const endStop: any = data.stops.find(
        (stop: any) => stop.stop_type === "end",
      );

      const details: RideDetails = {
        from: startStop?.locations?.name || "Unbekannt",
        to: endStop?.locations?.name || "Unbekannt",
        // @ts-ignore
        driverName: `${data.driver.first_name} ${data.driver.last_name.charAt(
          0,
        )}.`,
        // @ts-ignore
        driverCar: `${data.vehicle.brand} ${data.vehicle.model} (${data.vehicle.license_plate})`,
        duration: calculateDuration(data.start_time, data.end_time),
      };

      setRideDetails(details);
      setRideLoading(false);
    };

    fetchRideDetails();
  }, [rideId]);

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

    // Fetch the driver ID for this ride.
    // (Since your RideDetails interface does not include driverId, we query it separately.)
    const { data: rideData, error: rideError } = await supabase
      .from("rides")
      .select(`driver:users(id)`)
      .eq("id", rideId)
      .single();
    if (rideError) {
      console.error("Error fetching ride driver:", rideError.message);
      return;
    }
    // @ts-ignore
    const driverId = rideData?.driver?.id;
    if (!driverId) {
      console.error("Driver ID not found.");
      return;
    }

    // Check that the current user is not the driver.
    if (user.id === driverId) {
      console.error("You cannot review your own ride as a driver.");
      return;
    }

    // Check if the current user has already left a review for this driver.
    const { data: existingReview, error: existingReviewError } = await supabase
      .from("reviews")
      .select("id")
      .eq("reviewer_id", user.id)
      .eq("reviewee_id", driverId);
    if (existingReviewError) {
      console.error(
        "Error checking for existing review:",
        existingReviewError.message,
      );
      return;
    }
    if (existingReview && existingReview.length > 0) {
      console.error("You have already left a review for this driver.");
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
      reviewee_id: driverId,
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
            <h2 className="text-3xl font-bold mt-8">Wie war deine Fahrt?</h2>
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
                ? "Was hat dir an der Fahrt am meisten gefallen?"
                : "Was hat dir an der Fahrt nicht gefallen?"}
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
                  <strong>Fahrer:</strong> {rideDetails.driverName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-6 h-6 text-green-700" />
                <p className="text-gray-700">
                  <strong>Auto:</strong> {rideDetails.driverCar}
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

export default RateDriver;
