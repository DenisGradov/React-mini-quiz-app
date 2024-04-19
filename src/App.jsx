import { useEffect, useState } from "react";
import "./App.css";
import styles from "./app.module.scss";
import Quiz from "./components/Quiz.jsx";
import questions from "./data/questions";

function App() {
  const [questionsInfo, setQuestionsInfo] = useState({
    actualQuestion: 0,
    state: "waitForAnswer",
    answersForQuestions: [],
    usersAnswer: 0,
  });
  useEffect(() => {
    const newQuestionsInfo = { ...questionsInfo };
    questions.forEach((question, index) => {
      newQuestionsInfo.answersForQuestions.push("not answer");
    });
    setQuestionsInfo(newQuestionsInfo);
  }, []);
  return (
    <div className="App">
      <div className={styles.wrapper}>
        <Quiz
          questions={questions}
          questionsInfo={questionsInfo}
          setQuestionsInfo={setQuestionsInfo}
        />
      </div>
    </div>
  );
}

export default App;
