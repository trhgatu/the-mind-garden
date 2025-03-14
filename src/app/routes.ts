const ROOTS = {
    HOME: '/',
    PROFILE: '/profile',
    AUTH: '/auth',
    ADMIN: '/admin',
};

export const PATHS = {
    HOME: ROOTS.HOME,
    PROFILE: (username: string) => `${ROOTS.PROFILE}/${username}`,
    AUTH: {
        LOGIN: `${ROOTS.AUTH}/login`,
        REGISTER: `${ROOTS.AUTH}/register`,
    },
    ADMIN: {
        BASE: ROOTS.ADMIN,
        POSTS: `${ROOTS.ADMIN}/posts`,
        USERS: `${ROOTS.ADMIN}/users`,
        CATEGORIES: `${ROOTS.ADMIN}/categories`,
        TAGS: `${ROOTS.ADMIN}/tags`,
        QUOTES: `${ROOTS.ADMIN}/quotes`,
    },
};