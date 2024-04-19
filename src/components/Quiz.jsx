import React from "react";
import styles from "./quiz.module.scss";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
export default function Quiz({ questions, questionsInfo, setQuestionsInfo }) {
  function handleClickOnAnswer(numberOfAnswer) {
    if (questionsInfo.state === "waitForAnswer") {
      setQuestionsInfo((prevQuestionsInfo) => {
        const newAnswersForQuestions = [
          ...prevQuestionsInfo.answersForQuestions,
        ];
        newAnswersForQuestions[questionsInfo.actualQuestion] = questions[
          questionsInfo.actualQuestion
        ].answers[numberOfAnswer].isCorrect
          ? "correct"
          : "not correct";

        return {
          ...prevQuestionsInfo,
          state: "waitForNextAnswer",
          usersAnswer: numberOfAnswer,
          answersForQuestions: newAnswersForQuestions,
        };
      });
    }
  }
  function handleClicOnNextAnswer() {
    setQuestionsInfo((prevQuestionsInfo) => ({
      ...prevQuestionsInfo,
      state:
        questionsInfo.actualQuestion + 1 <
        questionsInfo.answersForQuestions.length
          ? "waitForAnswer"
          : "the end",
      actualQuestion: prevQuestionsInfo.actualQuestion + 1,
    }));
  }

  return (
    <>
      {questionsInfo.state !== "the end" ? (
        <div className={styles.questionsBox}>
          <h2 className={styles.questionsBox__numberOfQuestions}>
            Questions {questionsInfo.actualQuestion + 1} of{" "}
            {questionsInfo.answersForQuestions.length}
          </h2>
          <div className={styles.questionsBox__line}></div>
          <h1 className={styles.questionsBox__title}>
            {questions[questionsInfo.actualQuestion].question}
          </h1>
          <div className={styles.questionsBoxButtonBlock}>
            {questions[questionsInfo.actualQuestion].answers.map(
              (answer, numberOfAnswer) => {
                const isUserCorrect =
                  questionsInfo.usersAnswer !== null &&
                  questions[questionsInfo.actualQuestion].answers[
                    questionsInfo.usersAnswer
                  ].isCorrect;

                const isSelected = questionsInfo.usersAnswer === numberOfAnswer;

                let buttonStyle = styles.questionsBoxButtonBlock__button;
                buttonStyle += ` ${styles.button}`;
                if (isSelected) {
                  if (questionsInfo.state === "waitForNextAnswer") {
                    buttonStyle += answer.isCorrect
                      ? ` ${styles.questionsBoxButtonBlock__buttonCorrect}`
                      : ` ${styles.questionsBoxButtonBlock__buttonNotCorrect}`;
                  }
                } else {
                  if (
                    !isUserCorrect &&
                    answer.isCorrect &&
                    questionsInfo.state === "waitForNextAnswer"
                  ) {
                    buttonStyle += ` ${styles.questionsBoxButtonBlock__buttonCorrectButNotChoose}`;
                  }
                }
                return (
                  <div
                    key={`button ${numberOfAnswer}`}
                    onClick={() => handleClickOnAnswer(numberOfAnswer)}
                    className={buttonStyle}
                  >
                    {answer.text}
                  </div>
                );
              }
            )}
          </div>
          {questionsInfo.state === "waitForNextAnswer" ? (
            <div
              onClick={() => handleClicOnNextAnswer()}
              className={`${styles.questionsBox__button} ${styles.button}`}
            >
              Next
            </div>
          ) : (
            ""
          )}
          <div className={styles.questionsBoxAnswers}>
            {questionsInfo.answersForQuestions.map((answer, numberOfAnswer) => {
              let style = styles.questionsBoxAnswers__answer;
              let element = "";
              if (answer === "not correct") {
                style += ` ${styles.questionsBoxAnswers__notCorrect}`;
                element = <RiCloseFill className={styles.item} />;
              } else if (answer === "correct") {
                style += ` ${styles.questionsBoxAnswers__correct}`;
                element = <RiCheckFill className={styles.item} />;
              } else {
                style += ` ${styles.questionsBoxAnswers__none}`;
                element = false;
              }
              return <div className={style}>{element}</div>;
            })}
          </div>
        </div>
      ) : (
        <div className={`${styles.questionsBox} ${styles.questionsBoxEnd}`}>
          <h1 className={styles.questionsBox__endTitle}>
            You answered {questionsInfo.answersForQuestions.length} out of{" "}
            {questionsInfo.answersForQuestions.length} questions!
          </h1>
          <h2 className={styles.questionsBox__endGreenText}>
            Correct answers:
            {
              questionsInfo.answersForQuestions.filter((x) => x === "correct")
                .length
            }
          </h2>
          <h2 className={styles.questionsBox__endRedText}>
            Not correct answers:
            {
              questionsInfo.answersForQuestions.filter(
                (x) => x === "not correct"
              ).length
            }
          </h2>
        </div>
      )}
    </>
  );
}
