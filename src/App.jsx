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

f