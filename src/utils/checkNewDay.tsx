export const isNewDay = (pageKey: string): boolean => {
    const today = new Date().toLocaleDateString('en-CA'); // Outputs YYYY-MM-DD in local time zone
    const lastVisitKey = `${pageKey}-lastVisitDate`;
    const lastVisitDate = localStorage.getItem(lastVisitKey);

    console.log(`CheckNewDay.tsx: Today is: ${today}, Last Visit: ${lastVisitDate}`);

    if (today !== lastVisitDate) {
        localStorage.setItem(lastVisitKey, today);
        console.log(`CheckNewDay.tsx: It's a new day for ${pageKey}.`);
        return true;
    }

    console.log(`CheckNewDay.tsx: Not a new day for ${pageKey}.`);
    return false;
};
