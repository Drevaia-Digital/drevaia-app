type Props = {
  open: boolean;
};

export function NavbarMenu({
  open,
}: Props) {

  if (!open) {
    return null;
  }

  return (
    <div>
      {/* Próximamente: menú modular del Navbar */}
    </div>
  );

}