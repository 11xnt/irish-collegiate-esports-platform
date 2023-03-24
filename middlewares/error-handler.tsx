import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const withErrorHandler = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        return await fn(req, res)
    } catch (err) {
        // @ts-ignore
        const statusCode = err.statusCode || 500
        // @ts-ignore
        const message = err.message || "Oops, something went wrong!"
        res.status(statusCode).json({ statusCode, message })
    }
}

export default withErrorHandler