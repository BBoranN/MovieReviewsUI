export type user ={
    id: number,
    name: string,
    isAdmin?: boolean,
    email: string
}

export type list = {
    id: number,
    name: string,
    userId: number
}

export type media = {
    id: number,
    name: string,
    discriminator: string,
    description: string,
    director: string,
    genre: string
}

export type mediaReview ={
    mediatitle: string,
    mediaId: number,
    reviewId: number,
    username: string,
    userId: number,
    review: string
}