import { useNavigate } from "@solidjs/router";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Profile() {
 const navigate = useNavigate();
 const user = getAuth().currentUser;

 const logout = async () => {
  await signOut(getAuth());
  navigate("/login");
 };

 const removeUser = async () => {
  const user = getAuth().currentUser;

  if (!user) {
   alert("No user logged in");
   return;
  }

  const confirmed = confirm(
   "Are you sure you want to delete your account?"
  );

  if (!confirmed) return;

  try {
   await deleteDoc(doc(db, "users", user.uid));

   await deleteUser(user);

   alert("Account deleted successfully");

   navigate("/login");
  } catch (error: any) {
   console.error(error);

   if (error.code === "auth/requires-recent-login") {
    alert(
     "For security reasons, please logout and login again before deleting your account."
    );
   } else {
    alert(error.message);
   }
  }
 };

 return (
  <div class="min-h-screen bg-[#171717] text-white p-6">
   <div class="max-w-md mx-auto">

    <div class="bg-[#222] rounded-3xl p-8 text-center shadow-xl">
     <div class="w-24 h-24 mx-auto rounded-full bg-[#2ca4ab] flex items-center justify-center text-3xl font-bold mb-4">
      {user?.email?.charAt(0).toUpperCase()}
     </div>

     <h1 class="text-2xl font-bold">
      {user?.displayName || "Quran User"}
     </h1>

     <p class="text-gray-400 mt-2">
      {user?.email}
     </p>
    </div>

    <div class="mt-6 flex flex-col gap-3">

     <button
      onClick={logout}
      class="w-full py-3 rounded-xl bg-teal-600 text-white font-semibold cursor-pointer"
     >
      Logout
     </button>

     <button
      onClick={removeUser}
      class="w-full py-3 rounded-xl border border-red-600 bg-red-600 font-semibold cursor-pointer"
     >
      Delete Account
     </button>

    </div>
   </div>
  </div>
 );
}
