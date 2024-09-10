import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SideNav } from '@/Components/Dashboard/layout/aside-nav';
import "/src/app/globals.css";
import { config } from '@/config';

export const metadata = { title: `Dashboard | ${config.site.name}` };


export default function RootLayout({ children }) {
  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-default)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: '100%',
      }}
    >
      <SideNav />
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
        <main>
          <Container maxWidth="xl" sx={{ py: '64px' }}>
            {children}
          </Container>
        </main>
      </Box>
    </Box>

  );
}
