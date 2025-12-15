interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Loading issues...' }: LoadingStateProps) {
  return (
    <div className="loading-state">
      <div className="loading-state__spinner" />
      <p className="loading-state__text">{message}</p>
    </div>
  )
}
