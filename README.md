The goal of this project is to build a book finder using the openlibrary.org API. The application consists of two views. The first is the search page where you want the books to be displayed based on the query entered in the text field. The second view is the detailed view of the book.

Features:

- Search engine has a "debounce of about 500ms."
- Covers are displayed as a responsive grid
- After clicking on the cover, the user is redirected to the detailed view of the book
- The following information are displayed in the detailed view:
  - title
  - the author
  - date of first publication
  - first_sentence (if any)
  - cover_i (cover should be displayed using the Covers API)
