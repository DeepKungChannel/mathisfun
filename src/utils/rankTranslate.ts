
export default function getTextRank(ranknum: number): string{

    if (ranknum < 0) return ""
    const ranks = ["Bronze I", "Bronze II", "Bronze III", "Bronze IV", "Bronze V", "Silver I"]
    if (ranknum < ranks.length) {
        return ranks[ranknum]!
    }
    return ""
}