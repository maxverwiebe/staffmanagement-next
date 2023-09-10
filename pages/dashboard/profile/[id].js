import Layout from "@/components/dashboard/layout";
import { withSessionSsr } from '@/lib/withSession';
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";
import { getUser } from "@/pages/api/accountmanager";

export default function Profile({ user, profile }) {

    console.log(profile)

    if (!profile) {
        return (
            <Layout username={user.username} avatarURL={user.avatarURL}>
                <><p>Profile not found!</p></>
            </Layout>
        )
    }

    return (
        <Layout username={user.username} avatarURL={user.avatarURL}>
            <div className="flex items-center">
                <div className="flex-none mr-5">
                    <div className="relative">
                        <img
                            className="w-20 h-20 rounded-full ring-2 p-1 ring-green-300"
                            src={profile.avatarURL}
                            alt="Avatar"
                        />
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-3xl font-bold text-neutral-400">{profile.name}</h3>
                    <p className="text-xl text-neutral-600">{profile.name}</p>
                </div>
            </div>

            <hr className="w-48 h-1 my-6 bg-gray-100 border-0 rounded bg-neutral-700" />

            <div className="w-64">
                {/* Hier kannst du den Inhalt für den zweiten Bereich einfügen */}
                {/* Zum Beispiel: */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h4 className="text-xl text-neutral-400">Weitere Informationen</h4>
                    <p className="text-neutral-600">Hier könnten weitere Informationen stehen.</p>
                </div>
            </div>
        </Layout>
    );
}

function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

export const getServerSideProps = withSessionSsr(
    async ({req, res, params}) => {
        const user = req.session.user;
        const { id } = params;

        if(!user) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }

        if (!isValidObjectId(id)) {
            return {
                props: {
                    user,
                    profile: false,
                },
            };
        }

        const profile = await getUser(id) || {}
        profile._id = profile._id.toString()

        return {
            props: {
                user,
                profile,
            },
        };
    }
);
