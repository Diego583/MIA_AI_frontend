export function splitSentences(text: string): string[] {
    let sentences: string[] = [text];

    // Split every ". "
    function rule1(sentences: string[]): string[] {
        let newSentences: string[] = [];
        for (const sentence of sentences) {
            const sentences = sentence.split(". ")
                                      .map((s) => s.trim())
                                      .map((s) => s.endsWith(".") ? s.slice(0, -1) : s);
            newSentences = newSentences.concat(sentences);
        }
        return newSentences;
    }

    // Split every ", "
    function rule2(sentences: string[]): string[] {
        let newSentences: string[] = [];
        for (const sentence of sentences) {
            newSentences = newSentences.concat(sentence.split(", "));
        }
        return newSentences;
    }

    // Split every "? " but keep the "?" in the first sentence
    function rule3(sentences: string[]): string[] {
        let newSentences: string[] = [];
        for (let i = 0; i < sentences.length; i++) {
            let sentence = sentences[i];
            sentence = sentence.replace("? ", "?# ");
            newSentences = newSentences.concat(sentence.split("# "));
        }
        return newSentences;
    }

    sentences = rule1(sentences);
    sentences = rule2(sentences);
    sentences = rule3(sentences);

    return sentences;
}
