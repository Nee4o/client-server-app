using BookAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BookAPI.Controllers
{
    public class BookRepository
    {

        internal static async Task<List<Book>> getBooksAsync(Library1Context db)
        {
            return await db.Books
                .AsNoTracking()
                .ToListAsync();
        }
        internal static async Task<Book> getBookAsync(Library1Context db, int id)
        {
            return await db.Books
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        internal static async Task<bool> createBookAsync(Library1Context db, Book book)
        {
            try
            {
                await db.Books.AddAsync(book);
                return await db.SaveChangesAsync() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        internal static async Task<bool> updateBookAsync(Library1Context db, Book book)
        {
            try
            {
                db.Books.Update(book);
                return await db.SaveChangesAsync() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        internal static async Task<bool> deleteBookAsync(Library1Context db,int id)
        {
            try
            {
                var book = await db.Books.FirstOrDefaultAsync(b => b.Id == id);
                db.Remove(book);
                return await db.SaveChangesAsync() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
