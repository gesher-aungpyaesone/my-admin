import { AppBar, ToggleThemeButton, LocalesMenuButton } from 'react-admin';

export const CustomAppBar = () => {
  return (
    <AppBar
      toolbar={
        <>
          <LocalesMenuButton />
          <ToggleThemeButton />
        </>
      }
    />
  );
};
