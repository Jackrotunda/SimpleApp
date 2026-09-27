import { useState } from 'react'
import './App.css'

const QUESTION_POOL = [
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    answer: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    answer: 1,
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    answer: 1,
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 3,
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    answer: 2,
  },
  {
    question: 'What gas do plants primarily absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    answer: 2,
  },
  {
    question: 'Which country is home to the kangaroo?',
    options: ['South Africa', 'Australia', 'Brazil', 'India'],
    answer: 1,
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 2,
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    answer: 2,
  },
  {
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    answer: 2,
  },
  {
    question: 'Which organ pumps blood through the human body?',
    options: ['Lungs', 'Liver', 'Heart', 'Kidney'],
    answer: 2,
  },
  {
    question: 'What is the tallest mountain in the world?',
    options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali'],
    answer: 2,
  },
  {
    question: 'In which year did World War II end?',
    options: ['1943', '1945', '1947', '1950'],
    answer: 1,
  },
  {
    question: 'What is the currency used in Japan?',
    options: ['Won', 'Yuan', 'Yen', 'Ringgit'],
    answer: 2,
  },
  {
    question: 'How many legs does a spider have?',
    options: ['6', '8', '10', '12'],
    answer: 1,
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['African elephant', 'Blue whale', 'Giraffe', 'Great white shark'],
    answer: 1,
  },
  {
    question: 'Which language has the most native speakers worldwide?',
    options: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'],
    answer: 2,
  },
  {
    question: 'What is the freezing point of water in Celsius?',
    options: ['-10°C', '0°C', '10°C', '32°C'],
    answer: 1,
  },
  {
    question: 'Which country gifted the Statue of Liberty to the USA?',
    options: ['United Kingdom', 'France', 'Spain', 'Italy'],
    answer: 1,
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
    answer: 2,
  },
  {
    question: 'Which sport is known as "the beautiful game"?',
    options: ['Basketball', 'Football (Soccer)', 'Cricket', 'Tennis'],
    answer: 1,
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
    answer: 2,
  },
]

const QUESTIONS_PER_ROUND = 10

function shuffleArray(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickQuestions() {
  return shuffleArray(QUESTION_POOL).slice(0, QUESTIONS_PER_ROUND)
}

const BEST_SCORE_KEY = 'quiz-best-score'

function App() {
  const [questions, setQuestions] = useState(() => pickQuestions())
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY)
    return saved ? Number(saved) : 0
  })

  const question = questions[current]

  const handleSelect = (index) => {
    if (selected !== null) return // lock after first pick
    setSelected(index)
    if (index === question.answer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
      setSelected(null)
    } else {
      setFinished(true)
      if (score > bestScore) {
        setBestScore(score)
        localStorage.setItem(BEST_SCORE_KEY, String(score))
      }
    }
  }

  const handleRestart = () => {
    setQuestions(pickQuestions())
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="app">
        <h1>Quiz Complete!</h1>
        <p className="score">
          You scored {score} / {questions.length}
        </p>
        <p className="best-score">Best score: {bestScore} / {QUESTIONS_PER_ROUND}</p>
        <button className="primary-btn" onClick={handleRestart}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>General Trivia Quiz</h1>
      <p className="progress">
        Question {current + 1} of {questions.length}
      </p>
      <p className="question">{question.question}</p>

      <ul className="options">
        {question.options.map((option, index) => {
          let className = ''
          if (selected !== null) {
            if (index === question.answer) className = 'correct'
            else if (index === selected) className = 'incorrect'
          }
          return (
            <li key={index}>
              <button
                className={className}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
              >
                {option}
              </button>
            </li>
          )
        })}
      </ul>

      {selected !== null && (
        <button className="primary-btn" onClick={handleNext}>
          {current + 1 < questions.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}

export default App