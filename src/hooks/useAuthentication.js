import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { authenticationIsLoading } from '../reducers/userSlice';

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            return { user: data?.user || null }
        })

export function useAuthentication({ redirectTo, redirectIfFound } = {}) {
    const dispatch = useDispatch();
    const { data, error } = useSWR('/api/authentication', fetcher)
    const user = data?.user
    const finished = Boolean(data)
    const hasUser = Boolean(user)

    useEffect(() => {
        dispatch(authenticationIsLoading(!finished));
        if (!redirectTo || !finished) return
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !hasUser) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && hasUser)
        ) {
            Router.push(redirectTo)
        }
    }, [redirectTo, redirectIfFound, finished, hasUser])

    return error ? null : user
}
