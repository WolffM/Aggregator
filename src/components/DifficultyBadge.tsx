import type { Difficulty } from '../api/types'

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return <span className={`difficulty-badge difficulty-badge--${difficulty}`}>{difficulty}</span>
}
