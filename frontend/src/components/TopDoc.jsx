import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopDoc() {
  const navigate = useNavigate();
  const navigateUser = (item) => {
    navigate(`/doctor/${item._id}`, { item });
    scrollTo(0,0)
  };
  const doctors = useSelector((state) => state.doctor.doctors);
  return (
    <>
      <div className="mt-20">
        <div className="text-center">
          <p className="font-bold md:text-2xl">Top Doctors to Book</p>
          <p>
            Simply browse through our extensive list of trusted <br /> doctors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-10 md:space-x-8 mx-2 md:mx-10">
          {doctors.slice(0, 8).map((item) => {
            return (
              <>
                <div
                  onClick={() => navigateUser(item)}
                  key={item._id}
                  className="cards w-[90vw] md:w-[18vw] hover:-translate-y-[1rem] duration-500 transition-all cursor-pointer ring-1 ring-black rounded-lg"
                >
                  <img
                    className="w-full h-[45vh] rounded-t-xl "
                    src={item.img}
                    alt=""
                  />
                  <div className="flex items-center gap-1 pl-2 pt-1">
                    <div
                      className={`${
                        item.available ? "bg-green-700" : "bg-gray-700"
                      } h-3 w-3 rounded-full`}
                    ></div>
                    <p
                      className={`${
                        item.available ? "text-green-700" : "text-gray-600"
                      } `}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                  <p className="pl-2 pt-1 font-medium text-base">{item.name}</p>
                  <p className="pl-2 text-gray-600">{item.speciality}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className="w-full text-center">
          <Link to="/doctors">
            <button onClick={`navigate('/doctors'); screenTop(0,0)`} className="bg-gray-500 mt-8 mb-8 py-1 px-6 text-white font-normal rounded-md">
              More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopDoc;
