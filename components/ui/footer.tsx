export default function Footer() {
  return (
    <footer>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        &copy; {new Date().getFullYear()} OpenStream. All rights reserved.
      </div>
    </footer>
  );
}
