import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import { User } from "@/types.ts";
import { supabase } from "@/supabaseClient.ts";
import { PublicProfile } from "@/pages/Profile/PublicProfile.tsx";
import { AccountSettings } from "@/pages/Profile/AccountSettings.tsx";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";

const Profile = () => {
  const { session, loading, error } = useSupabaseSession();
  const [activeTab, setActiveTab] = useState<"public" | "account">("public");
  const [user, setUser] = useState<User>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: null,
    image: null,
    is_id_verified: false,
    is_license_verified: false,
    phone: null,
    languages: [],
    preferences: [],
    vehicles: [],
    created_at: "",
    updated_at: "",
  });

  const fetchData = async () => {
    try {
      if (!session) return;

      if (session.user?.id) {
        const { data: userData, error } = await supabase
          .from("users")
          .select(
            `
              *,
              vehicles (
                id,
                brand,
                model,
                color,
                license_plate,
                seats,
                created_at,
                updated_at
              )
            `,
          )
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data with reviews:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="w-10/12 mx-auto my-16">
        <div className="flex justify-center gap-10 border-b-2 border-gray-200 pb-4">
          <button
            className={`text-lg font-medium ${
              activeTab === "public"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("public")}
          >
            Öffentliches Profil
          </button>
          <button
            className={`text-lg font-medium ${
              activeTab === "account"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Kontoeinstellungen
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "public" ? (
            <PublicProfile user={user} refetchUserData={fetchData} />
          ) : (
            <AccountSettings user={user} refetchUserData={fetchData} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
