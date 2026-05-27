import type { GameResult } from '../types'

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}

const success = {
  perfect: [
    '全部答对，你是单词小天才！🌟',
    '完美通关！老师都要为你鼓掌！👏',
    '太厉害了，学霸就是你！📚✨',
    '满分！单词大王非你莫属！👑',
    '无敌是多么寂寞！🏆',
    'Perfect！你就是传说中的英语小达人！⭐',
    '全对！快让妈妈奖励你一颗糖！🍬',
    '太强了！你已经是单词大师了！🎓',
  ],
  great: [
    '做得真棒，继续加油哦！💪',
    '不错不错，进步很大呢！📈',
    '好厉害呀，再练练就能拿满分了！🎯',
    '真不错！你已经记住了好多单词！🧠',
    '优秀！离满分就差一点点啦！✨',
    '表现很好，给自己鼓个掌！👏',
    '学得不错，明天会更棒的！🌈',
    '有进步！每天练一练，单词全记牢！📝',
  ],
  good: [
    '还可以哦，再多练练吧！💪',
    '加油！多复习几次就会了！📖',
    '继续努力，你能行的！⭐',
    '别灰心，多读多写就记住了！✍️',
    '进步空间还很大，加油呀！🚀',
    '每一次练习都在进步哦！🌱',
    '坚持就是胜利，再来一次吧！🎯',
  ],
}

const failure = [
  '没关系，失败是成功之母！💪',
  '别灰心，再来一次会更好！🌈',
  '加油！多练几次就能记住啦！📖',
  '每个人都是从不会到会的！🌟',
  '不要放弃，你离成功越来越近了！🎯',
  '这一次的错题，就是下一次的得分点！📈',
  '休息一下，等会儿再战！⚡',
  '失败不可怕，可怕的是不敢再试！💪',
  '哇，你已经比上一次更勇敢了！🌻',
  '罗马不是一天建成的，单词也不是一天记住的！🏛️',
  '别着急，慢慢来，比较快！🐢',
  '错误是最好的老师，我们学到了什么？📚',
  '再来！这次肯定比上次好！🔥',
  '每一次跌倒，都是为了跳得更高！🚀',
]

export function getPerfectMsg(): string {
  return pick(success.perfect)
}

export function getGreatMsg(): string {
  return pick(success.great)
}

export function getGoodMsg(): string {
  return pick(success.good)
}

export function getFailureMsg(): string {
  return pick(failure)
}

export function getResultMsg(score: number, total: number): GameResult {
  const ratio = score / total
  if (ratio >= 1) return { emoji: '🏆', title: '完美通关！', msg: getPerfectMsg() }
  if (ratio >= 0.8) return { emoji: '🌟', title: '非常棒！', msg: getGreatMsg() }
  if (ratio >= 0.5) return { emoji: '👍', title: '还不错！', msg: getGoodMsg() }
  return { emoji: '💪', title: '继续加油！', msg: getFailureMsg() }
}
