import { useSelector } from "react-redux";

const UserInfomation = () => {
   
        
    const { user } = useSelector((state)=>state.auth)

    return(
        <>
              {/* RIGHT CONTENT */}
      <div className="md:w-3/4 bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold border-b pb-3">
          Profile Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="text-lg font-semibold">{user.number || NaN}</p>
          </div>
         
        </div>

        <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
        
        </>
    )
}

export default UserInfomation