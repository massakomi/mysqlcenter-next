export default function DashboardLayout({children, team, analytics }) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}