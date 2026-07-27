import { BookOpen, Users, ArrowLeftRight, TriangleAlert } from "lucide-react";
import DashboardCard from "./DashboardCard";
import RentalsChart from "./RentalChart";
import MyButton from "src/components/my-button/MyButton";
import RentalTable from "../rentals/RentalTable";
import "./dashboard.sass";
import BooksTable from "../books/BooksTable";
import DashBookTable from "./DashBookTable";

export default function Dashboard() {
  const data = {
    cards: { books: 1245, customers: 382, rentals: 41, overdue: 3 },
  };
  return (
    <div className="dashboard">
      <div className="grid grid-cols-4 gap-4 gap-x-6 mb-4">
        <DashboardCard
          title="Total Books"
          value={1245}
          subtitle="Across all categories"
          icon={<BookOpen size={28} className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <DashboardCard
          title="Customers"
          value={382}
          subtitle="Registered members"
          icon={<Users size={28} className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <DashboardCard
          title="Active Rentals"
          value={41}
          subtitle="Currently borrowed"
          icon={<ArrowLeftRight size={28} className="text-violet-600" />}
          iconBg="bg-violet-100"
        />

        <DashboardCard
          title="Overdue"
          value={3}
          subtitle="Need attention"
          icon={<TriangleAlert size={28} className="text-red-600" />}
          iconBg="bg-red-100"
        />
      </div>

      <div className="flex gap-6 mb-4">
        <div className="flex-grow-1 ">
          <RentalsChart />
        </div>

        <div className="dashboard-card text-xs">
          <h5>Running Low</h5>
          <DashBookTable books={books} />
        </div>

        <div className="w-50 flex flex-col dashboard-card">
          <h5 className="">Quick Action</h5>
          <div className="flex flex-col justify-between grow-1">
            <div className="w-full p-3 bg-blue-800 text-amber-50 rounded-md link-like">
              New Book
            </div>
            <div className="w-full p-3 bg-blue-800 text-amber-50 rounded-md">
              Add Customer
            </div>
            <div className="w-full p-3 bg-blue-800 text-amber-50 rounded-md">
              Rent Book
            </div>
            <div className="w-full p-3 bg-blue-800 text-amber-50 rounded-md">
              Renturn Rental
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-x-6 mb-4">
        <div className="dashboard-card flex flex-col">
          <div className="flex justify-between">
            <h5>Recent Rentals</h5>
            <div className="link-like text-blue-700"> See More</div>
          </div>
          <RentalTable
            rentals={rentals}
            getRentals={() => {}}
            showColumns={["customer", "book", "rentedDate", "dueDate"]}
            pagination={false}
          />
        </div>
        <div className="dashboard-card  flex flex-col">
          <h5>Overdue Rentals</h5>
          <RentalTable
            rentals={rentals}
            getRentals={() => {}}
            showColumns={["customer", "book", "dueDate", "actions"]}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

const rentals = [
  {
    id: "1",
    bookId: "4",
    customerId: "2",
    staffId: "1",
    rentedDate: "2025-09-25",
    dueDate: "2025-09-30",
    returnedDate: null,
    bookTitle: "Design Patterns",
    customerName: "Mohamed",
    staffName: "Jane",
  },
  {
    id: "2",
    bookId: "3",
    customerId: "2",
    staffId: "2",
    rentedDate: "2025-09-29",
    dueDate: "2025-10-06",
    returnedDate: "2025-10-14",
    bookTitle: "Refactoring",
    customerName: "Mohamed",
    staffName: "",
  },
];

const books = [
  {
    id: "17",
    title: "Eloquent JavaScript",
    totalCopies: 16,
    availableCopies: 12,
    genre: "Programming",
    author: "Marijn Haverbeke",
    pages: 472,
    isbn: "9781593279509",
    coverImageUrl: "https://covers.openlibrary.org/b/isbn/9781593279509-M.jpg",
    releasedDate: "2018-12-04",
  },
  {
    id: "18",
    title: "The Phoenix Project",
    totalCopies: 8,
    availableCopies: 6,
    genre: "IT & Business",
    author: "Gene Kim et al.",
    pages: 432,
    isbn: "9780988262591",
    coverImageUrl: "https://covers.openlibrary.org/b/isbn/9780988262591-M.jpg",
    releasedDate: "2013-01-10",
  },
  {
    id: "19",
    title: "Algorithms to Live By",
    totalCopies: 11,
    availableCopies: 7,
    genre: "Computer Science",
    author: "Brian Christian & Tom Griffiths",
    pages: 368,
    isbn: "9781627790369",
    coverImageUrl: "https://covers.openlibrary.org/b/isbn/9781627790369-M.jpg",
    releasedDate: "2016-04-19",
  },
  {
    id: "20",
    title: "Soft Skills",
    totalCopies: 10,
    availableCopies: 8,
    genre: "Career Development",
    author: "John Sonmez",
    pages: 504,
    isbn: "9781617292392",
    coverImageUrl: "https://covers.openlibrary.org/b/isbn/9781617292392-M.jpg",
    releasedDate: "2014-11-14",
  },
];
