using System;
using System.Collections.Generic;

namespace BookAPI.Model;

public partial class Book
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Genre { get; set; }

    public int AuthorId { get; set; }

    public virtual Author Author { get; set; } = null!;
}
