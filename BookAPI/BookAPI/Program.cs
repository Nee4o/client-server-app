using BookAPI.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using BookAPI.Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:3000");
        }
    );
});

builder.Services.AddDbContext<Library1Context>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")).UseLazyLoadingProxies());

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

//logic
app.MapGet("/getBooks", async (Library1Context db) => await BookRepository.getBooksAsync(db))
    .WithTags("Books Endpoints");
app.MapGet("/getBook/{id}", async (Library1Context db, int id) =>
    {
        Book book = await BookRepository.getBookAsync(db,id);

        if (book != null)
            return Results.Ok(book);

        return Results.BadRequest();
    })
    .WithTags("Books Endpoints");

app.MapPost("/createBook", async (Library1Context db, Book book) =>
    {
        if (await BookRepository.createBookAsync(db, book))
            return Results.Ok("Create successful.");

        return Results.BadRequest();
    })
    .WithTags("Books Endpoints");

app.MapPut("/updateBook", async (Library1Context db, Book book) =>
    {
        if (await BookRepository.updateBookAsync(db, book))
            return Results.Ok("Update successful.");

        return Results.BadRequest();
    })
    .WithTags("Books Endpoints");

app.MapDelete("/deleteBook/{id}", async (Library1Context db, int id) =>
    {
        if (await BookRepository.deleteBookAsync(db, id))
            return Results.Ok("Delete successful.");

        return Results.BadRequest();
    })
    .WithTags("Books Endpoints");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CORSPolicy");

app.MapControllers();

app.Run();
