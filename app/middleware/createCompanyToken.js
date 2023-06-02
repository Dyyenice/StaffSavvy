
createToken = () => {
    const rand = () => {
        return Math.random().toString(36).substr(2);
    };

    return () => {
    return rand() + rand();
}
}



const createCompanyToken = {
    createToken

};

module.exports = createCompanyToken;