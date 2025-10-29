using System;
using System.Collections.Generic;

namespace BookAPI.Model;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Username { get; set; } = null!;

    public int Age { get; set; }

    public int RoleId { get; set; }

    public virtual Role Role { get; set; } = null!;
}
