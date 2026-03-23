const STRONG_PUNCT = new Set([".", "!", "?", "。", "！", "？", "\n"]);
const SOFT_PUNCT = new Set([",", "，", ";", "；", ":", "：", "、"]);

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findPrevSignificantChar(text, index) {
    for (let i = index - 1; i >= 0; i -= 1) {
        const ch = text[i];
        if (!/\s/.test(ch)) return ch;
    }
    return null;
}

function isSentenceStart(text, index) {
    if (index <= 0) return true;
    const prev = findPrevSignificantChar(text, index);
    if (!prev) return true;
    return STRONG_PUNCT.has(prev);
}

export function getNaturalTypingDelay(text, index) {
    const ch = text[index] || "";

    // Sentence starts slower, middle text faster.
    let delay = isSentenceStart(text, index)
        ? randomBetween(26, 42)
        : randomBetween(7, 13);

    if (ch === " ") delay = randomBetween(5, 11);

    // Pause at punctuation to mimic thinking cadence.
    if (SOFT_PUNCT.has(ch)) {
        delay += randomBetween(36, 76);
    } else if (STRONG_PUNCT.has(ch)) {
        delay += randomBetween(90, 170);
    }

    return delay;
}

export function getNaturalTypingChunkSize(text, index) {
    const ch = text[index] || "";
    if (!ch) return 1;

    if (STRONG_PUNCT.has(ch) || SOFT_PUNCT.has(ch) || ch === "\n") return 1;
    if (/\s/.test(ch)) return 1;

    const remaining = text.length - index;
    if (remaining > 220) return randomBetween(3, 5);
    if (remaining > 90) return randomBetween(2, 4);
    return randomBetween(1, 3);
}

export function buildTypingCacheKey(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i += 1) {
        hash = ((hash << 5) + hash) ^ text.charCodeAt(i);
    }
    return `typed:${(hash >>> 0).toString(36)}:${text.length}`;
}
