export const toTitleCase = (text) => {
    const pattern = /^é$|^e$|^o$|^a$|^os$|^as$|^ao$|^à$|^aos$|^às$|^de$|^do$|^da$|^dos$|^das$|^no$|^na$|^para$|^nos$|^nas$|^pro$|^pra$|^pros$|^pras$|^pelo$|^pela$|^pelos$|^pelas$|^um$|^uma$|^uns$|^umas$/;
    return text
        .trim()
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
            if (pattern.test(word)) {
                if (index == 0) {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                }
                if (index == text.trim().split(' ').length - 1) {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};