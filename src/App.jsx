import { useState } from 'react'
import './App.css'

const QUESTIONS = [
  {
    question: 'Which hook lets you add state to a function component?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1,
  },
  {
    question: 'What command initializes a new git repository?',
    options: ['git start', 'git init', 'git new', 'git create'],
    answer: 1,
  },
  {
    question: 'Which command stages all changed files for commit?',
    options: ['git add .', 'git commit -a', 'git push', 'git stage all'],
    answer: 0,
  },
  {
    question: 'MCP stands for...',
    options: [
      'Model Context Protocol',
      'Multi Component Page',
      'Master Control Program',
      'Managed Cloud Platform',
    ],
    answer: 0,
  },
  {
    question: 'In React, what do you call reusable pieces of UI?',
    options: ['Modules', 'Components', 'Widgets', 'Blocks'],
    answer: 1,
  },
]

const BEST_SCORE_KEY = 'quiz-best-score'

function App() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY)
    return saved ? Number(saved) : 0
  })

  const question = QUESTIONS[current]

  const handleSelect = (index) => {
    if (selected !== null) return // lock after first pick
    setSelected(index)
    if (index === question.answer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < QUESTIONS.length) {
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
          You scored {score} / {QUESTIONS.length}
        </p>
        <p className="best-score">Best score: {bestScore} / {QUESTIONS.length}</p>
        <button className="primary-btn" onClick={handleRestart}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Quick Quiz</h1>
      <p className="progress">
        Question {current + 1} of {QUESTIONS.length}
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
          {current + 1 < QUESTIONS.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}

export default App