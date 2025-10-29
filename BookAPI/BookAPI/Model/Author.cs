using System;
using System.Collections.Generic;

namespace BookAPI.Model;

public partial class Author
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string? Fathername { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
