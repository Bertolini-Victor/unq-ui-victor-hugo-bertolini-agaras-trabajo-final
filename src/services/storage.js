const Storage = {

    setHighestScore: (difficulty, score) => {
        localStorage.setItem(`highestScore_${difficulty}`, score); 
        window.dispatchEvent(new Event("scoreUpdated"));
    },

    getHighestScore: (difficulty) => {
        return localStorage.getItem(`highestScore_${difficulty}`);
    },

    clear: () => {
        localStorage.removeItem('highestScore_easy');
        localStorage.removeItem('highestScore_medium');
        localStorage.removeItem('highestScore_hard');
        localStorage.removeItem('highestScore_extreme');
    }

}

export default Storage;