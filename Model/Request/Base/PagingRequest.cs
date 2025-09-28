namespace Model.Request.Base
{
  public class PagingRequest
  {

    public int? page_size { get; set; }

    public int? page_index { get; set; }

    public string? sort_by { get; set; }
    public string? sort_mode { get; set; }
    public string? search_key { get; set; }
  }
}