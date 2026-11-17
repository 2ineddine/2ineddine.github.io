import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';


function Navigation({ parentToChild, modeChange, language = 'en', onLanguageChange }: any) {
  const navItems = language === 'fr'
    ? [
        ['Accueil', 'home'],
        ['Projets', 'projects'],
        ['Activité', 'activity'],
        ['Compétences', 'expertise'],
        ['Parcours', 'history'],
        ['Langues', 'languages'],
        ['Certifications', 'certifications'],
        ['Langages', 'programming-languages'],
        ['Contact', 'contact'],
      ]
    : [
        ['Home', 'home'],
        ['Projects', 'projects'],
        ['Activity', 'activity'],
        ['Skills', 'expertise'],
        ['Journey', 'history'],
        ['Languages', 'languages'],
        ['Certifications', 'certifications'],
        ['Programming', 'programming-languages'],
        ['Contact', 'contact'],
      ];

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>('home');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll-spy: the current section is the last one whose top has passed 40% of the viewport.
  useEffect(() => {
    const ids = ['home', 'projects', 'activity', 'expertise', 'history', 'languages', 'certifications', 'programming-languages', 'contact'];
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = id;
      }
      setCurrent(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  const scrollToSection = (section: string) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fr = language === 'fr';
  const mode = parentToChild?.mode;
  const closeAnd = (fn: () => void) => () => { setMobileOpen(false); setTimeout(fn, 250); };

  const drawer = (
    <Box className="nav-drawer-inner" role="presentation">
      <div className="nav-drawer-head">
        <span className="nav-brand-mark">ZB</span>
        <button className="nav-icon-btn" aria-label={fr ? 'Fermer le menu' : 'Close menu'} onClick={handleDrawerToggle}>✕</button>
      </div>
      <List className="nav-drawer-list">
        {navItems.map((item, i) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton className={current === item[1] ? 'on' : ''} onClick={closeAnd(() => scrollToSection(item[1]))}>
              <span className="nav-drawer-n">{String(i + 1).padStart(2, '0')}</span>
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="nav-drawer-foot">
        <button className="nav-drawer-chip" onClick={(e) => modeChange?.({ x: e.clientX, y: e.clientY })}>
          {mode === 'dark' ? '☀ ' : '☽ '}{mode === 'dark' ? (fr ? 'Mode clair' : 'Light mode') : fr ? 'Mode sombre' : 'Dark mode'}
        </button>
        <button className="nav-drawer-chip" onClick={() => onLanguageChange?.(language === 'en' ? 'fr' : 'en')}>
          {language === 'en' ? 'Français' : 'English'}
        </button>
      </div>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className='navigation-bar'>
          <IconButton
            color="inherit"
            aria-label={fr ? 'Ouvrir le menu' : 'Open menu'}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Zineddine Bouhadjira">
            <span className="nav-brand-mark">ZB</span>
            <span className="nav-brand-name">Zineddine</span>
          </button>
          <Box sx={{ display: { xs: 'none', lg: 'block' }, flexGrow: 1 }}>
            {navItems.filter((i) => i[1] !== 'contact').map((item) => (
              <Button key={item[0]} className={current === item[1] ? 'nav-link active' : 'nav-link'} onClick={() => scrollToSection(item[1])} sx={{ display: { lg: 'inline-flex' } }}>
                {item[0]}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { lg: 'none' } }} />
          <button className="nav-icon-btn nav-theme-btn" aria-label={fr ? 'Changer de thème' : 'Toggle theme'} onClick={(e) => modeChange?.({ x: e.clientX, y: e.clientY })}>
            {mode === 'dark' ? '☀' : '☽'}
          </button>
          <Button
            className="lang-btn"
            onClick={() => onLanguageChange?.(language === 'en' ? 'fr' : 'en')}
            sx={{ minWidth: 'auto' }}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </Button>
          <Button className="nav-cta" onClick={() => scrollToSection('contact')} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Contact ↗
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          container={() => document.querySelector('.main-container') as HTMLElement}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'min(86vw, 360px)' },
          }}
          PaperProps={{ className: 'nav-drawer' }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
