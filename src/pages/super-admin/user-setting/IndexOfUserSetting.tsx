import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiCallManager } from "../../../api/services/apiCallfunctions";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { useProfileStore } from "../../../zustand/useProfileStore";
import UserHeader from "./UserHeader";
import UserProfileDetails from "./UserProfileDetails";

function IndexOfUserSetting() {
  const { email_id, id_value } = getUserCookie();
  const setuserProfileData = useProfileStore(
    (state: any) => state.setProfileData
  );
  const usermutation = useMutation({
    mutationFn: (mutationData) => apiCallManager(mutationData),
    onSuccess: (data) => {
      setuserProfileData(data.data[0]);
    },
  });
  useEffect(() => {
    const userDetails: any = {
      event_type: "list_user_details",
      email_id: email_id,
      id_value: id_value,
    };
    usermutation.mutate(userDetails);
  }, []);
  return (
    <div className=" border-[1.6px]  border-grey">
      <UserHeader />
      <div className="p-5">
        <UserProfileDetails />
      </div>
    </div>
  );
}

export default IndexOfUserSetting;
