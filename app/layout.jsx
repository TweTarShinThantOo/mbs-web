import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { AdminAuthProvider } from "../context/AdminAuthContext";
import { MascotProvider } from "../context/MascotContext";

export const metadata = {
  title: "Cavite Mascot Rentals",
  description: "Online Mascot Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white antialiased">
        <AdminAuthProvider>
          <AuthProvider>
            <MascotProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </MascotProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}