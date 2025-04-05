import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updataProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/Doctor/update-profile",
        updateData,
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    <div>
      <div className="flex flex-col gap-5 m-5">
        <img
          className="bg-primary w-full sm:max-w-64 rounded-lg"
          src={profileData.image ?? ""}
          alt="Doctor Profile"
        />

        {/* Doctor About Section */}
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData.name ?? ""}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData.degree ?? ""} - {profileData.speciality ?? ""}
            </p>
          </div>

          <button className="py-0.5 px-2 border text-xs rounded-full">
            {profileData.experience ?? ""}
          </button>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData.about ?? ""}
            </p>
          </div>

          {/* Fees */}
          <p className="text-gray-600 font-medium mt-4">
            Appointment fees:
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees ?? ""}
                  className="border px-1 py-0.5 ml-2 w-24 rounded"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <div className="text-sm">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    value={profileData.address?.line1 ?? ""}
                    placeholder="Address Line 1"
                    className="border px-1 py-0.5 rounded block mb-1"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    value={profileData.address?.line2 ?? ""}
                    placeholder="Address Line 2"
                    className="border px-1 py-0.5 rounded block"
                  />
                </>
              ) : (
                <>
                  {profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </>
              )}
            </div>
          </div>

          {/* Available Checkbox */}
          <div className="flex gap-1 pt-2 items-center">
            <input
              type="checkbox"
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={!!profileData.available}
            />
            <label htmlFor="">Available</label>
          </div>
        </div>

        {/* Edit / Save Button */}
        {isEdit ? (
          <button
            onClick={updataProfile}
            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
