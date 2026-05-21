const STORAGE_PREFIX = 'frog_avoid_'

function loadList(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveList(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr))
  } catch {
    // localStorage full or unavailable
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Pick `count` items from `list`, preferring items not recently seen.
 * Remembers recently-picked items in localStorage so consecutive rounds
 * show different questions.
 *
 * Works for both subset picking (Quiz / Matching / Spelling) and
 * full-list shuffling (Flashcard). For full-list shuffling it records
 * the tail items to avoid them leading the next round.
 *
 * @param {{en:string,zh:string}[]} list  Full item array
 * @param {number} count  How many items to pick
 * @param {string} storageKey  Unique per (game × grade × word|sentence)
 * @returns {{en:string,zh:string}[]} Picked items, already shuffled
 */
export function pickItems(list, count, storageKey) {
  if (!list.length) return []

  const key = STORAGE_PREFIX + storageKey
  const recent = loadList(key)
  const recentSet = new Set(recent)

  // Separate into fresh (not recently seen) and aged (recently seen)
  const fresh = list.filter(item => !recentSet.has(item.en))
  const aged = list.filter(item => recentSet.has(item.en))

  let selected

  if (count >= list.length) {
    // Full list: fresh items first, aged items later
    selected = [...shuffle(fresh), ...shuffle(aged)]
  } else if (fresh.length >= count) {
    // Enough fresh items — pick from fresh only
    selected = shuffle(fresh).slice(0, count)
  } else {
    // Supplement with aged items, oldest-first
    const needed = count - fresh.length
    const agedOrdered = aged.sort((a, b) => recent.indexOf(a.en) - recent.indexOf(b.en))
    selected = shuffle([...shuffle(fresh), ...agedOrdered.slice(0, needed)])
  }

  // Update recent list: selected items move to the end
  const newRecent = [...recent]
  selected.forEach(item => {
    const idx = newRecent.indexOf(item.en)
    if (idx !== -1) newRecent.splice(idx, 1)
    newRecent.push(item.en)
  })

  // Keep at most (count × 2) or list.length, whichever is smaller
  const maxRecent = count >= list.length
    ? Math.min(5, list.length)   // full list: only remember the tail
    : Math.min(count * 2, list.length)
  if (newRecent.length > maxRecent) {
    newRecent.splice(0, newRecent.length - maxRecent)
  }
  saveList(key, newRecent)

  return selected
}
