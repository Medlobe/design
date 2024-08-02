import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { color, motion } from "framer-motion";
import axios from "axios";
import CallChatBot from "../components/callChatbot";

export default function Facts() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const adminToken = sessionStorage.getItem("adminToken");
  const adminAuth = sessionStorage.getItem("adminAuth");

  //states
  const [fact, setFact] = useState("");
  const [allFacts, setAllFacts] = useState([
    "Quinoa, being a seed, provides a complete source of protein, making it ideal for muscle repair and growth. Its high fiber content aids digestion and promotes a feeling of fullness, aiding in weight management.",
    "Kiwifruit's abundance of vitamin C boosts the immune system, aids in collagen production for healthy skin, and enhances iron absorption, preventing anemia.",
    "Chia seeds' omega-3 fatty acids reduce inflammation, support brain health, and contribute to heart health by lowering cholesterol levels.",
    "Nutritional yeast's B vitamins support energy production, nerve function, and metabolism, while its high protein content aids in muscle repair and growth.",
    "Seaweed's iodine content supports thyroid health and metabolism, while its calcium strengthens bones and teeth, and its antioxidants protect against cellular damage.",
    "Buckwheat's magnesium content supports nerve function and muscle relaxation, promoting better sleep and reducing stress.",
    "Beet greens' vitamin K supports blood clotting and bone health, while their iron content prevents fatigue and supports oxygen transport in the body.",
    "Blackstrap molasses' iron content helps prevent anemia and fatigue, while its calcium strengthens bones and teeth.",
    "Brazil nuts' selenium content acts as a powerful antioxidant, supporting immune function and reducing inflammation in the body.",
  ]);
  const [factsIconValue, setFactsIconValue] = useState(false);
  const [addDivValue, setAddDivValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editInput, setEditInput] = useState("");

  const [recentUploadedFact, setRecentUploadedFact] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration in milliseconds
      easing: "ease", // animation easing function
      delay: 100, // delay between each animated element
      once: true, // whether animation should only happen once
    });
    AOS.refresh();
  }, []);

  const changeDivValue = () => {
    setAddDivValue(!addDivValue);
  };

  const handleUpload = async () => {
    const factsArray = fact.split(".. ").map((fact) => fact.trim());
    const facts = factsArray.map((fact) => ({ fact }));

    console.log(adminToken);
    console.log(facts);

    try {
      const response = await axios.post(
        `${serverName}facts/uploadFact`,
        { facts },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log("Facts uploaded:", response.data.facts);
      setRecentUploadedFact(response.data.facts);
      setFact("");
    } catch (error) {
      console.log("Error uploading facts:", error.message);
    }
  };

  //getting facts from db
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await axios.get(`${serverName}facts/getFacts`);

        const gottenFacts = response.data.facts.slice().reverse();
        setAllFacts(gottenFacts);
        console.log("facts from database :", gottenFacts);
      } catch (error) {
        console.error("Error fetching facts from db:", error);
      }
    };

    fetchFacts();
  }, [recentUploadedFact]);

  // Filtering facts based on search query
  const filteredFacts = allFacts.filter(
    (fact) =>
      fact.fact && fact.fact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //add a state toEditValues of false to each fact
  const [toEditValues, setToEditValues] = useState(
    Array(filteredFacts.length).fill(false)
  );

  //change the toEditValue of the fact clicked
  // const handleEditClick = (index, fact) => {
  //   // Create an array with all values set to false (non-edit mode)
  //   const newToEditValues = toEditValues.map((_, idx) => false);

  //   // Toggle only the clicked item's edit state
  //   newToEditValues[index] = !newToEditValues[index];

  //   // Update the state with the modified array
  //   setToEditValues(newToEditValues);

  //   // Set the edit input to the fact being edited
  //   setEditInput(fact);
  // };

  const handleEditClick = (index, fact = null) => {
    // Set all to false (reset all edit states)
    const newToEditValues = toEditValues.map((_, idx) => false);

    // If fact is null, do not toggle the current item
    if (fact !== null) {
      newToEditValues[index] = !newToEditValues[index]; // Toggle only if fact is not null
    }
    // Update the state
    setToEditValues(newToEditValues);
    setEditInput(fact); // Set the edit input if provided
  };

  //edit fact
  const handleEditFact = async (id) => {
    try {
      // Send a PUT request to update the fact
      const response = await axios.put(
        `${serverName}facts/updateFact/${id}`,
        { fact: editInput },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log("fact edited succesfully", response.data.fact);
      window.location.reload();
    } catch (error) {
      console.log("Failed to update fact:", error);
    }
  };

  //  delete fact
  const handleDeleteFact = async (id) => {
    // Handle delete logic here
    try {
      await axios.delete(`${serverName}facts/deleteFact/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setAllFacts(allFacts.filter((fact) => fact._id !== id));
      console.log("Fact deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting fact:", error);
    }
  };

  return (
    <div className="container factsContainer">
      <Navbar />
      <input
        type="text"
        placeholder="Seach for a fact , symptom , diet e.t.c"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchInput"
      />
      <h1 data-aos="fade-down-left">
        Intresting Health facts you should know !!!
      </h1>
      {adminAuth && (
        <i class="fa-solid fa-plus factsAddIcon" onClick={changeDivValue}></i>
      )}
      {addDivValue && (
        <div className="addFactDiv">
          <textarea
            placeholder="input a fact "
            value={fact}
            onChange={(e) => setFact(e.target.value)}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      {adminAuth ? (
        <div data-aos="fade-up" className="arr">
          {filteredFacts.map((fact, index) => (
            <div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {!toEditValues[index] ? (
                <div className="textCon">
                  <h3>{fact.fact}</h3>
                  <span>
                    <i
                      className="fa-solid fa-pencil"
                      onClick={() => handleEditClick(index, fact.fact)}
                    ></i>
                    <hr />
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDeleteFact(fact._id)}
                    ></i>
                  </span>
                </div>
              ) : (
                <div className="textCon">
                  <textarea
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    aria-description={fact.fact}
                    spellCheck
                  />
                  <span>
                    <button
                      onClick={() => handleEditFact(fact._id)}
                      style={{
                        backgroundColor: "rgb(46, 46, 245)",
                        color: "white",
                      }}
                    >
                      edit{" "}
                    </button>
                    <hr />
                    <button onClick={() => handleEditClick(index, null)}>
                      cancel
                    </button>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div data-aos="fade-up" className="arr">
          {filteredFacts.map((fact, index) => (
            <motion.div
              key={index}
             
            >
              <div className="textCon">
                <h3>{fact.fact}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/*   <div className="emptyMessage">
              <p>Sorry . Couldn't get that ...</p>
               </div> */}
      <CallChatBot />
    </div>
  );
}
