import { GiSparkles, GiCrown } from 'react-icons/gi'
import { useGameStore, getNextReward } from '../store/gameStore'

export default function RewardAlert() {
  const { currentStepIndex } = useGameStore()
  const next = getNextReward(currentStepIndex)

  if (!next || next.stepsAway > 15) return null

  const isClose = next.stepsAway <= 3
  const isAscend = next.step.reward?.type === 'ascendancy_point'
  const Icon = isAscend ? GiCrown : GiSparkles
  const label = isAscend ? 'ASCENDANCY' : 'SKILL POINT'

  return (
    <div className={`reward-alert ${isClose ? 'reward-alert--close' : ''}`}>
      <Icon className="reward-alert-icon" size={20} />
      <div className="reward-alert-body">
        <div className="reward-alert-label">{label} in {next.stepsAway} step{next.stepsAway > 1 ? 's' : ''}</div>
        <div className="reward-alert-desc">{next.step.reward?.description}</div>
      </div>
    </div>
  )
}
