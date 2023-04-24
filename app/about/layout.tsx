export const metadata = {
    title: 'About Page',
    description: 'About Page',
}

const AboutLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <h1>About Layout</h1>
            {children}
        </div>
    )
}

export default AboutLayout;