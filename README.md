Book Web App

Task Description:

You need to create a simple web application that displays a list of books obtained
from a mock API. Your application should allow users to view book details and add or
remove books from a list of favorites (stored locally). The list of favorite books
doesn't need to be presented visually. Use the stored data to show visually which book
is in the favorites and which is not, for example, by using a heart icon with two
states. The book details should include the book title, author, description, cover
image, and publication date.

Technical Requirements:

• Use React js for the web app and create reusable components.
• Only TypeScript is allowed; use it to define interfaces for your components,
API response data, and other types as needed.
• Use Sass to create a global style and to style your components.
• Handle the communication with the API using fetch or a library of your choice,
and cache the API response data to prevent unnecessary re-renders (you can also
use libraries here).
• Don't present all the books on one page, rather, use pagination and show 5
books per page.
• The list of book favorites should persist even after the user closes and re-
opens the browser.

API

You can use a mock API that returns book data. Here's an example of the API endpoints
to call:

List

GET https://my=json-server.typicode.com/cutamar/mock/books

The response will be an array of objects, where each object represents a book and
contains the following information:

• id : int - the ID of the book.
• title : string - the title of the book.
• author : string - the name of the author.
• description : string - a short description of the book.
• cover : string - a URL pointing to the cover image of the book.
• publicationDate : string - the publication date of the book, in ISo format.

Detail

GET https://my-json-server.typicode.com/cutamar/mock/books/id

NOTE: Replace id by the actual numerical id of the book.

The response will be a book object, and contains the following information:

• id : int - the ID of the book.
• title : string - the title of the book.
• author : string - the name of the author.
• description : string - a short description of the book.
• cover : string - a URL pointing to the cover image of the book.
• publicationDate : string - the publication date of the book, in ISO format.

Optional

Implement a create/edit/delete feature for new books (in the local state). You cannot
send this data to the backend via API, but you'll manage these newly created books
locally.

Technical Requirements:

• Implement a form using react-hook-form to support adding new books.
• These books are stored in the local state.
• The list of books from before, should show both, the books from the API, and
the ones from the local state.
• Edit and delete should also be implemented and only supported for locally
stored books.

In this optional task, the focus lays in the logic / handling.

Evaluation Criteria

We will evaluate your task based on the following criteria:

• Code quality: the code should be clean, easy to read, and follow best
practices.
• Functionality: the application should meet the requirements listed above.
• Performance: the application should perform well and not have any unnecessary
function calls.
• UI/UX: the application is supposed to have an intuitive and engaging design.