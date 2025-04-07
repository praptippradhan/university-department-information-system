import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";
import { FaListUl } from "react-icons/fa";

const Subjects = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    semester: "",
    branch: ""
  });

  const [search, setSearch] = useState({ semester: "", branch: "" });
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState([]);

  const getSubjectHandler = () => {
    if (!search.semester || !search.branch) {
      toast.error("Please select both semester and branch!");
      return;
    }

    toast.loading("Getting Subjects...");
    axios
        .post(`${baseApiURL()}/subject/getSubject`, search, {
          headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            if (response.data.subject.length === 0) {
              toast.error("No Subject Found!");
              setSubject([]);
            } else {
              toast.success(response.data.message);
              setSubject(response.data.subject);
            }
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.error("Error fetching subjects:", error); // Log the error
          toast.error(error.response ? error.response.data.message : "An error occurred");
        });
  };

  const addSubjectHandler = () => {
    if (!data.name || !data.code || !data.semester || !data.branch) {
      toast.error("Please fill all fields!");
      return;
    }

    toast.loading("Adding Subject...");
    axios
        .post(`${baseApiURL()}/subject/addSubject`, data, {
          headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            setData({ name: "", code: "", semester: "", branch: "" });
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Subject...");
    axios
        .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, {
          headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            getSubjectHandler();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
  };

  const branches = [
    { name: "Biomedical Engineering", code: "BME" },
    { name: "Biotechnology", code: "BT" },
    { name: "Ceramic Engineering", code: "CR" },
    { name: "Chemical Engineering", code: "CH" },
    { name: "Civil Engineering", code: "CE" },
    { name: "Computer Science Engineering", code: "CSE" },
    { name: "Electrical Engineering", code: "EE" },
    { name: "Electronics and Communication Engineering", code: "ECE" },
    { name: "Food Process Engineering", code: "FPE" },
    { name: "Industrial Design", code: "ID" },
    { name: "Mechanical Engineering", code: "ME" },
    { name: "Metallurgical and Materials Engineering", code: "MM" },
    { name: "Mining Engineering", code: "MN" }
  ];

  return (
      <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
        <div className="flex justify-between items-center w-full">
          <Heading title="Add Subject" />
          <div className="flex justify-end items-center w-full">
            <button
                className={`${selected === "add" ? "border-b-2 border-blue-500" : ""} px-4 py-2 text-black rounded-sm mr-6`}
                onClick={() => setSelected("add")}
            >
              Add Subject
            </button>
            <button
                className={`${selected === "view" ? "border-b-2 border-blue-500" : ""} px-4 py-2 text-black rounded-sm`}
                onClick={() => setSelected("view")}
            >
              View Subject
            </button>
          </div>
        </div>

        {selected === "add" && (
            <div className="flex flex-col justify-center items-center w-full mt-8">
              <div className="w-[40%] mb-4">
                <label htmlFor="semester" className="text-sm">
                  Select Semester
                </label>
                <select
                    id="semester"
                    className="px-2 bg-blue-50 py-3 rounded text-base w-full mt-1"
                    value={data.semester}
                    onChange={(e) => setData({ ...data, semester: e.target.value })}
                >
                  <option value="">-- Select Semester --</option>
                  {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Semester
                      </option>
                  ))}
                </select>
              </div>

              <div className="w-[40%] mb-4">
                <label htmlFor="branch" className="text-sm">
                  Select Branch
                </label>
                <select
                    id="branch"
                    className="px-2 bg-blue-50 py-3 rounded text-base w-full mt-1"
                    value={data.branch}
                    onChange={(e) => setData({ ...data, branch: e.target.value })}
                >
                  <option value="">-- Select Branch --</option>
                  {branches.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name}
                      </option>
                  ))}
                </select>
              </div>

              <div className="w-[40%] mb-4">
                <label htmlFor="code" className="text-sm">
                  Enter Subject Code
                </label>
                <input
                    type="text"
                    id="code"
                    value={data.code}
                    onChange={(e) => setData({ ...data, code: e.target.value })}
                    className="w-full bg-blue-50 rounded border px-3 py-2"
                />
              </div>

              <div className="w-[40%] mb-4">
                <label htmlFor="name" className="text-sm">
                  Enter Subject Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full bg-blue-50 rounded border px-3 py-2"
                />
              </div>

              <button
                  className="mt-6 bg-blue-500 px-6 py-3 text-white rounded hover:bg-blue-600"
                  onClick={addSubjectHandler}
              >
                Add Subject
              </button>
            </div>
        )}

        {selected === "view" && (
            <>
              <div className="w-full flex justify-center items-center mt-12">
                <div className="w-full flex flex-col items-center">
                  <p className="mb-4 text-xl font-medium">Select Semester & Branch</p>
                  <div className="flex gap-4 justify-center w-full">
                    <select
                        value={search.semester}
                        onChange={(e) =>
                            setSearch((prev) => ({
                              ...prev,
                              semester: e.target.value
                            }))
                        }
                        className="px-2 bg-blue-50 py-3 rounded w-[25%]"
                    >
                      <option value="">-- Semester --</option>
                      {[...Array(8)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Semester
                          </option>
                      ))}
                    </select>

                    <select
                        value={search.branch}
                        onChange={(e) =>
                            setSearch((prev) => ({
                              ...prev,
                              branch: e.target.value
                            }))
                        }
                        className="px-2 bg-blue-50 py-3 rounded w-[25%]"
                    >
                      <option value="">-- Branch --</option>
                      {branches.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.name}
                          </option>
                      ))}
                    </select>

                    <button
                        className="flex items-center px-4 py-2 border-2 border-blue-500 text-blue-600 rounded hover:bg-blue-100"
                        onClick={getSubjectHandler}
                    >
                      View Subjects <FaListUl className="ml-2 text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 w-full flex flex-col items-center">
                <ul className="w-full flex flex-col items-center">
                  {subject && Array.isArray(subject) && subject.length > 0 ? (
                      subject.map((item) => (
                          <li
                              key={item.code}
                              className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%] rounded shadow-sm"
                          >
                            <div>
                              {item.code} - {item.name}
                            </div>
                            <button
                                className="text-2xl hover:text-red-500"
                                onClick={() => deleteSubjectHandler(item._id)}
                            >
                              <MdOutlineDelete />
                            </button>
                          </li>
                      ))
                  ) : (
                      <p>No subjects found.</p>
                  )}
                </ul>
              </div>
            </>
        )}
      </div>
  );
};

export default Subjects;
