import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import Modal from "@/components/Modal.tsx";
import { User } from "@/types.ts";
import { supabase } from "@/supabaseClient.ts";
import { PublicProfile } from "@/pages/Profile/PublicProfile.tsx";
import { AccountSettings } from "@/pages/Profile/AccountSettings.tsx";

const Profile = () => {
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
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user?.id;

      if (userId) {
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
          .eq("id", userId)
          .single();

        if (error) throw error;
        console.log("User data with reviews:", userData);
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data with reviews:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    setLogoutModalOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteModalOpen(false);
  };

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>;
  }

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
            <AccountSettings
              user={user}
              onLogout={() => setLogoutModalOpen(true)}
              onDeleteAccount={() => setDeleteModalOpen(true)}
            />
          )}
        </div>

        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          title="Logout Confirmation"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Logout
              </button>
            </div>
          }
        >
          <p className="text-gray-700 text-center">
            Are you sure you want to log out?
            <br />
            This action will end your session.
          </p>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Account Confirmation"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          }
        >
          <p className="text-gray-700 text-center">
            Are you sure you want to delete your account?
            <br />
            This action is irreversible.
          </p>
        </Modal>
      </div>
    </Layout>
  );
};

export default Profile;
