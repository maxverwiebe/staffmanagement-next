import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withSessionSsr } from '@/lib/withSession';

export default function test2({ user }) {
    const router = useRouter()

    return (
        <Layout username={user.username} avatarURL={user.avatarURL}>
            <h1>hi</h1>
            {user ? <p>Angemeldet als: {user.username}</p> : <p>Nicht angemeldet</p>}
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }

        return {
            props: { user }
        }
    }
);
