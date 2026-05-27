import type { Item } from '../types'

const STORAGE_PREFIX = 'frog_avoid_'

function loadList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveList(key: string, arr: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(arr))
  } catch {}
}

function shuffle(arr: Item[]): Item[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickItems(list: Item[], count: number, storageKey: string): Item[] {
  if (!list.length) return []

  const key = STORAGE_PREFIX + storageKey
  const recent = loadList(key)
  const recentSet = new Set(recent)

  const fresh = list.filter(item => !recentSet.has(item.en))
  const aged = list.filter(item => recentSet.has(item.en))

  let selected: Item[]

  if (count >= list.length) {
    selected = [...shuffle(fresh), ...shuffle(aged)]
  } else if (fresh.length >= count) {
    selected = shuffle(fresh).slice(0, count)
  } else {
    const needed = count - fresh.length
    const agedOrdered = aged.sort((a, b) => recent.indexOf(a.en) - recent.indexOf(b.en))
    selected = shuffle([...shuffle(fresh), ...agedOrdered.slice(0, needed)])
  }

  const newRecent = [...recent]
  selected.forEach(item => {
    const idx = newRecent.indexOf(item.en)
    if (idx !== -1) newRecent.splice(idx, 1)
    newRecent.push(item.en)
  })

  const maxRecent = count >= list.length
    ? Math.min(5, list.length)
    : Math.min(count * 2, list.length)
  if (newRecent.length > maxRecent) {
    newRecent.splice(0, newRecent.length - maxRecent)
  }
  saveList(key, newRecent)

  return selected
}
