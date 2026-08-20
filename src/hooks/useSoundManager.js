export const useSoundManager = () => {
    const playSound = ({
        src,
        volume = 1,
    }) => {
        if (!src) return;

        const audio = new Audio(src);

        audio.volume = Math.min(
            Math.max(volume, 0),
            1
        );

        audio.play();
    };

    return {
        playSound,
    };
};