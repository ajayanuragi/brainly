export type AuthUser = {
    userId: string;
    username: string;
    token: string;
};
export type SigninProps = {
    onSignIn: (user: AuthUser) => void;
};

export type SignupProps = {
    onSignUp: (user: AuthUser) => void;
}
export type Note = {
    id: string;
    type: string;
    link: string;
    title: string;
    tags: string[];
};
export type Content = {
    type: "document" | "tweet" | "youtube" | "link";
    link: string;
    title: string;
    tags?: string[];
};

